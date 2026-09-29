import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import { useExpenses } from '../context/ExpenseContext';
import { CategoryBadge } from '../components/CategoryBadge';
import { CATEGORIES } from '../constants/categories';
import { getCategoryInfo } from '../constants/categories';
import { ExpenseCategory } from '../types';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';

export default function AddExpenseScreen() {
  const router = useRouter();
  const { addExpense, settings } = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const selectedCat = getCategoryInfo(category);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter an expense title.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    setSaving(true);

    try {
      await addExpense({
        id: uuidv4(),
        title: title.trim(),
        amount: parsedAmount,
        category,
        date: new Date().toISOString(),
        note: note.trim() || undefined,
      });

      setTitle('');
      setAmount('');
      setCategory('food');
      setNote('');

      Alert.alert('Expense Added! ✅', `${title} — ${settings.currency} ${parsedAmount}`, [
        { text: 'Add Another', style: 'default' },
        { text: 'Dashboard', onPress: () => router.push('/') },
      ]);
    } catch {
      Alert.alert('Error', 'Failed to save expense.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Amount Hero */}
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <LinearGradient
            colors={[selectedCat.color + '20', selectedCat.color + '05', Colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.amountCard}
          >
            <Text style={styles.currencyLabel}>{settings.currency}</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              placeholderTextColor={Colors.textDim}
              keyboardType="numeric"
              autoFocus
            />
            <View style={[styles.categoryIndicator, { backgroundColor: selectedCat.color + '20' }]}>
              <Ionicons name={selectedCat.icon as any} size={14} color={selectedCat.color} />
              <Text style={[styles.categoryIndicatorText, { color: selectedCat.color }]}>
                {selectedCat.label}
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Title Field */}
        <Animated.View entering={FadeInUp.delay(100).duration(400)} style={styles.field}>
          <Text style={styles.label}>What was it for?</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="pencil-outline" size={18} color={Colors.textMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Lunch at restaurant"
              placeholderTextColor={Colors.textDim}
            />
          </View>
        </Animated.View>

        {/* Category Grid */}
        <Animated.View entering={FadeInUp.delay(200).duration(400)} style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categories}>
            {CATEGORIES.map((cat, i) => (
              <CategoryBadge
                key={cat.key}
                category={cat}
                selected={category === cat.key}
                onPress={() => setCategory(cat.key)}
                index={i}
              />
            ))}
          </View>
        </Animated.View>

        {/* Note Field */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.field}>
          <Text style={styles.label}>Note (optional)</Text>
          <View style={[styles.inputContainer, styles.noteContainer]}>
            <TextInput
              style={[styles.input, styles.noteInput]}
              value={note}
              onChangeText={setNote}
              placeholder="Add more details..."
              placeholderTextColor={Colors.textDim}
              multiline
              numberOfLines={3}
            />
          </View>
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInUp.delay(400).duration(400)}>
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={saving ? [Colors.textMuted, Colors.textMuted] : [Colors.primary, Colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.saveButton, Shadow.glow(Colors.primary)]}
            >
              <Ionicons name={saving ? 'hourglass' : 'checkmark-circle'} size={22} color="#fff" />
              <Text style={styles.saveButtonText}>
                {saving ? 'Saving...' : 'Add Expense'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingBottom: 100,
  },
  amountCard: {
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  currencyLabel: {
    color: Colors.textSecondary,
    fontSize: FontSize.lg,
    fontWeight: '700',
    letterSpacing: 1,
  },
  amountInput: {
    color: Colors.text,
    fontSize: 56,
    fontWeight: '900',
    minWidth: 120,
    textAlign: 'center',
    letterSpacing: -2,
    paddingVertical: Spacing.sm,
  },
  categoryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    gap: 6,
    marginTop: Spacing.sm,
  },
  categoryIndicatorText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  inputIcon: {
    paddingLeft: Spacing.md,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  noteContainer: {
    alignItems: 'flex-start',
  },
  noteInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  saveButton: {
    flexDirection: 'row',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: Spacing.sm,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: FontSize.lg,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
